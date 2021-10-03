import User from './Users.json';

export default function Valid(user: any) {
	return user && User.includes(user.email);
}
