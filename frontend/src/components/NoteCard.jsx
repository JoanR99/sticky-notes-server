import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import NoteModal from './NoteModal';
import useShowModal from '../hooks/useShowModal';
import DeleteNote from './DeleteNote';
import ArchiveNote from './ArchiveNote';
import EditNote from './EditNote';

const NoteCard = ({ note }) => {
	const updatedAt = new Date(note.updatedAt);
	const lastEdit = `Last edit: ${updatedAt.toLocaleDateString()} - ${updatedAt.toLocaleTimeString()}`;
	const { show, handleClose, handleShow } = useShowModal();

	return (
		<>
			<NoteModal
				show={show}
				handleClose={handleClose}
				note={note}
				lastEdit={lastEdit}
			/>
			<Card variant="outlined" sx={{ backgroundColor: note.color.hex }}>
				<CardContent onClick={() => handleShow()}>
					<Typography variant="h5" component="div">
						{note.title}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{lastEdit}
					</Typography>
				</CardContent>

				<CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
					<EditNote note={note} />
					<ArchiveNote note={note} />
					<DeleteNote note={note} />
				</CardActions>
			</Card>
		</>
	);
};

export default NoteCard;
