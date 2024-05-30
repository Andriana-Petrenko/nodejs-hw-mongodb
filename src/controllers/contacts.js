import { createContact, getAllContacts, getContactById } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res,next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
        message: 'Successfully found contacts!',
        data: contacts,
    });
     } catch(err) {
        next(err);
    }
    
};

export const getContactByIdController = async (req, res,next) => {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
         next(createHttpError(404, 'Contact not found'));
        return;
    };
    res.status(200).json({
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
        });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};