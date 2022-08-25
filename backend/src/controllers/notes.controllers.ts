import { Response } from 'express';

import * as userService from '../services/user.services';
import * as notesService from '../services/notes.services';
import * as colorService from '../services/color.services';
import NotFound from '../errors/NotFound';
import { CustomRequest } from '../middlewares/verifyJWT';
import BadRequest from '../errors/BadRequest';

export const getNotes = async (req: CustomRequest, res: Response) => {
	const id = req.user;
	const { isArchive } = req.query;

	const booleanIsArchive: boolean = isArchive == 'false' ? false : true;

	if (typeof isArchive === 'undefined') {
		throw new BadRequest(['isArchive is not defined']);
	}

	const user = await userService.findUserById(Number(id));

	if (!user) {
		throw new NotFound('User not found');
	}

	const notes = await notesService.findByUserIdAndIsArchive(
		user.id,
		booleanIsArchive
	);

	console.log(notes);

	res.status(200).json(notes);
};

export const createNote = async (req: CustomRequest, res: Response) => {
	const id = req.user;
	const { title, content, colorId } = req.body;

	const user = await userService.findUserById(Number(id));

	if (!user) {
		throw new NotFound('User not found');
	}

	const color = await colorService.findById(colorId);

	if (!color) {
		throw new NotFound('Color not found');
	}

	const note = await notesService.createNote(title, content, color.id, user.id);

	res.status(201).json(note);
};

export const getNote = async (req: CustomRequest, res: Response) => {
	const userId = req.user;
	const { id } = req.params;

	const note = await notesService.findByIdAndUserId(Number(id), Number(userId));

	if (note) {
		return res.status(200).json(note);
	} else {
		return res.status(400).json({ errorMessage: 'Note not found.' });
	}
};

export const deleteNote = async (req: CustomRequest, res: Response) => {
	const userId = req.user;
	const { id } = req.params;

	const note = await notesService.findByIdAndUserId(Number(id), Number(userId));

	if (!note) throw new NotFound('Note not found');

	await notesService.deleteNote(Number(id));

	return res.status(200).json({ message: 'Note deleted successfully' });
};

export const updateNote = async (req: CustomRequest, res: Response) => {
	const userId = req.user;
	const { id } = req.params;
	const { title, content, colorId, isArchive } = req.body;

	const note = await notesService.findByIdAndUserId(Number(id), Number(userId));

	if (!note) {
		throw new NotFound('Note not found');
	}

	if (typeof isArchive === 'undefined') {
		if (note.colorId !== colorId) {
			const newColor = await colorService.findById(colorId);

			if (!newColor) {
				throw new NotFound('Color not found');
			}

			await notesService.connectColor(note.id, newColor.id);
		}

		await notesService.updateNote(note.id, title, content);
	} else {
		await notesService.updateIsArchive(note.id, Boolean(isArchive));
	}

	return res.status(200).json({ message: 'Note updated successfully' });
};
