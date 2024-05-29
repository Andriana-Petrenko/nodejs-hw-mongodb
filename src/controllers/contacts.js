import { getAllContacts, getContactById } from "../services/contacts.js";

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

export const getContactByIdController = async (req, res) => {
    const contactId = req.params.contactId;
    // try {
        const contact = await getContactById(contactId);
        if (!contact) {
            return res.status(404).json({
                message: `There is no contact with id ${contactId}`,
            });
        };
        res.status(200).json({
            message: `Successfully found contact with id ${contactId}`,
            data: contact,
        });
    // } catch (error) {
    //     return res.status(404).json({
    //         message: `There is no contact with id ${contactId}`,
    //     });
    // }
};