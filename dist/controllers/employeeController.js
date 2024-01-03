import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multerMiddleware.js';
import Employee from '../models/EmployeeModel.js';
import Cancelled from '../models/CancelledModel.js';
import Activity from '../models/ActivityModel.js';
import APIFeatures from '../utils/apiFeatures.js';
// Get all employees
export const getAllEmployees = async (req, res) => {
    const employeesCount = await Employee.countDocuments();
    // BUILD Query
    const features = new APIFeatures(Employee.find({ status: { $nin: ['cancelled'] } }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    // EXECUTE Query
    const employees = await features.query;
    res.status(StatusCodes.OK).json({ employees, employeesCount });
};
// Create a new employee
export const createEmployee = async (req, res) => {
    const createdEmployee = await Employee.create(req.body);
    await Activity.create({
        userName: req.user.name,
        activity: 'Created Employee',
        timeStamp: Date.now(),
    });
    res.status(StatusCodes.CREATED).json({ employee: createdEmployee });
};
// Get a specific employee by ID
export const getEmployee = async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).populate('vacations');
    res.status(StatusCodes.CREATED).json({ employee });
};
// Update an employee
export const updateEmployee = async (req, res) => {
    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        req.body[req.body.fieldName] = response.secure_url;
        req.body[`${req.body.fieldName}PublicId`] = response.public_id;
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    if (req.file && updatedEmployee[`${req.body.fieldName}PublicId`])
        await cloudinary.v2.uploader.destroy(updatedEmployee[`${req.body.fieldName}PublicId`]);
    await Activity.create({
        userName: req.user.name,
        activity: 'Updated Employee',
        timeStamp: Date.now(),
    });
    res
        .status(StatusCodes.OK)
        .json({ message: 'Employee modified.', employee: updatedEmployee });
};
// Delete an employee
export const deleteEmployee = async (req, res) => {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    await Cancelled.create({
        name: deletedEmployee.name,
        idNumber: deletedEmployee.idNumber,
        cancellationDate: new Date(),
    });
    await Activity.create({
        userName: req.user.name,
        activity: 'Deleted Employee',
        timeStamp: Date.now(),
    });
    res
        .status(StatusCodes.OK)
        .json({ message: 'Employee deleted.', employee: deletedEmployee });
};
// Special Controllers
// Get employees with expired IDs
export const getExpiredIds = async (req, res) => {
    const expirationDate = new Date(Date.now());
    const employees = await Employee.aggregate([
        {
            $match: {
                idExpirationDate: { $lt: expirationDate },
                status: { $nin: ['cancelled'] },
            },
        },
        {
            $project: {
                nationality: 0,
                idImage: 0,
                passportNumber: 0,
                passportImage: 0,
                agreementExpirationDate: 0,
                licenseExpirationDate: 0,
                licenseType: 0,
                cancellationDate: 0,
                vacations: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: '$workIn',
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
// Get employees with IDs up for renewal
export const getIdsRenewal = async (req, res) => {
    const employees = await Employee.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: [{ $month: '$idExpirationDate' }, req.body.month] },
                        { $eq: [{ $year: '$idExpirationDate' }, req.body.year] },
                    ],
                },
                status: { $nin: ['cancelled'] },
            },
        },
        {
            $project: {
                nationality: 0,
                idImage: 0,
                status: 0,
                passportNumber: 0,
                passportImage: 0,
                licenseExpirationDate: 0,
                licenseType: 0,
                cancellationDate: 0,
                vacations: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: `$${req.body.groupBy}`,
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
// Get employees by sponsor
export const getSponsor = async (req, res) => {
    const employees = await Employee.aggregate([
        {
            $match: {
                sponsor: req.body.sponsor,
                status: { $nin: ['cancelled'] },
            },
        },
        {
            $project: {
                idImage: 0,
                passportNumber: 0,
                passportImage: 0,
                passportExpirationDate: 0,
                licenseExpirationDate: 0,
                licenseType: 0,
                agreementExpirationDate: 0,
                cancellationDate: 0,
                vacations: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: `$${req.body.groupBy}`,
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
// Get employees with expired passports
export const getPassports = async (req, res) => {
    const expirationDate = new Date();
    const employees = await Employee.aggregate([
        {
            $match: {
                passportExpirationDate: { $lt: expirationDate },
                status: { $nin: ['cancelled'] },
            },
        },
        {
            $project: {
                idImage: 0,
                idExpirationDate: 0,
                passportImage: 0,
                agreementExpirationDate: 0,
                licenseExpirationDate: 0,
                licenseType: 0,
                cancellationDate: 0,
                vacations: 0,
                workIn: 0,
                status: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: `$${req.body.groupBy}`,
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
// Get employees with driver status
export const getDrivers = async (req, res) => {
    const employees = await Employee.aggregate([
        {
            $match: {
                status: { $nin: ['cancelled'] },
            },
        },
        {
            $project: {
                nationality: 0,
                status: 0,
                idExpirationDate: 0,
                idImage: 0,
                passportNumber: 0,
                passportImage: 0,
                passportExpirationDate: 0,
                agreementExpirationDate: 0,
                cancellationDate: 0,
                vacations: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: `$${req.body.groupBy}`,
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
// Get employees by status
export const getStatus = async (req, res) => {
    const { status, groupBy } = req.query;
    const employees = await Employee.aggregate([
        {
            $match: {
                status: status,
            },
        },
        {
            $project: {
                nationality: 0,
                idImage: 0,
                passportNumber: 0,
                passportImage: 0,
                agreementExpirationDate: 0,
                licenseExpirationDate: 0,
                licenseType: 0,
                cancellationDate: 0,
                vacations: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
        {
            $group: {
                _id: `$${groupBy}`,
                documents: { $push: '$$ROOT' },
            },
        },
    ]);
    res.status(StatusCodes.OK).json({ employees });
};
