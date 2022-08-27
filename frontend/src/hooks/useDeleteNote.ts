import { useMutation, useQueryClient } from 'react-query';
import { AxiosInstance } from 'axios';

import { deleteNote } from '../services/notes.services';

const useDeleteNote = (privateRequest: AxiosInstance) => {
	const request = deleteNote(privateRequest);
	const queryClient = useQueryClient();

	return useMutation(async (id: number) => await request(id), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['notes', { isArchive: false }]);
			queryClient.invalidateQueries(['notes', { isArchive: true }]);
		},
	});
};

export default useDeleteNote;
