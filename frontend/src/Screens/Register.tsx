import { Box, Typography, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import RegisterForm from '../components/RegisterForm';

const LinkItem = styled(Link)`
	text-decoration: none;
	color: #3683dc;
	background-color: #00000;
	&:hover {
		text-decoration: underline;
		color: #5ea1b6;
	}
`;

const Register = () => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		sx={{ width: '100%', height: '100%', backgroundColor: '#fff', mt: 2 }}
	>
		<Box
			sx={{
				maxWidth: '30rem',
				width: '100%',
				backgroundColor: '#fff',
				mt: 2,
			}}
		>
			<RegisterForm />

			<Grid container justifyContent="center" sx={{ mt: 2 }}>
				<Stack sx={{ textAlign: 'center' }}>
					<Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
						Already have an account? <LinkItem to="/login">Login</LinkItem>
					</Typography>
				</Stack>
			</Grid>
		</Box>
	</Box>
);

export default Register;