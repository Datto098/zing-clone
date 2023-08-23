'use client';
import '../../styles/sidebar.css';
import {menus} from '../../variables/menu';
import Link from 'next/link';
import {useContext} from 'react';
import {AppContext, AppContextType} from '@/context/app-context';
import {UserContext, UserContextType} from '@/context/user-context';
import {toast} from 'react-hot-toast';
export default function SidebarLeft(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveHeader} = appContext;

	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	const checkUser = (currentItem: any) => {
		if (user.userId === '' && currentItem !== 0) {
			toast('Vui lòng đăng nhập trước', {
				icon: '🥺',
			});
		}
	};

	return (
		<div
			className='sidebar-left'
			style={isActiveHeader ? {minWidth: '250px'} : {minWidth: '0px'}}
		>
			<ul className='menu'>
				{menus.map((menu) => {
					return (
						<li
							className='menu-item flex items-center'
							key={menu.id}
						>
							<Link
								onClick={() => {
									checkUser(menu.id);
								}}
								href={user.userId !== '' ? menu.link : '/'}
								className='flex items-center gap-3'
							>
								{menu.icon}
								{menu.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
