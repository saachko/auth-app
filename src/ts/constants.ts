import { TableHeading } from './interfaces';

const baseUrl = 'https://auth-backend-gjj1.onrender.com/';
const signUp = `${baseUrl}auth/signup`;
const signIn = `${baseUrl}auth/signin`;
const user = `${baseUrl}users`;
const users = `${user}/users`;

const responseStatuses = {
  success: 200,
  status400: 400,
  status403: 403,
};

const emailValidation = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

const tableHeadings: TableHeading[] = [
  {
    id: '1',
    headingName: '#',
  },
  {
    id: '2',
    headingName: 'id',
  },
  {
    id: '3',
    headingName: 'Name',
  },
  {
    id: '4',
    headingName: 'E-mail',
  },
  {
    id: '5',
    headingName: 'Registration date & time',
  },
  {
    id: '6',
    headingName: 'Last login date & time',
  },
  {
    id: '7',
    headingName: 'Status',
  },
];

const iconStyle = { color: 'white', fontSize: '1.3em', marginTop: '-5px' };

const textForWarnings = {
  delete: 'delete',
  block: 'block',
  unblock: 'unblock',
};

export {
  signUp,
  signIn,
  user,
  users,
  responseStatuses,
  emailValidation,
  tableHeadings,
  iconStyle,
  textForWarnings,
};
