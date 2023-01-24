import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { NavbarData } from '../utils/NavBarData';
import Link from 'next/link';
import styles from '../styles/Home4.module.css';
import { useDispatch } from 'react-redux';
import { UPDATE_LOBBY } from '../reducers/lobbyReducer';

function NavBar() {
    const dispatch=useDispatch();

	function handleLobby(value){
		dispatch(UPDATE_LOBBY(value));
	}

	const handleLogout = () => {
		// const auth=getAuth();
		// dispatch({
		// 	type:'SHOW_LOADER'
		// });
		// signOut(auth).then(()=>{
		// 	dispatch({
		// 		type:'REMOVE_LOADER'
		// 	})
		// 	console.log('sign out successfull');
		// 	toast('Signed Out Successfully')
		// 	navigate('/signin');
		// }).catch((error)=>{
		// 	dispatch({
		// 		type:'REMOVE_LOADER'
		// 	})
		// 	toast(error.message);
		// 	console.log('sign out error'+ error);
		// })
	};

	return (
		<div className={styles.whNavBar}>
			<div className={styles.whLogo}>
				
			</div>
				{NavbarData.map((item, index) => {
					if (index === 1 || index === 5) {
						return <hr key={index} className={styles.whDivider} />;
					} else
						return (
							<div
								key={index}
								className={styles.whMenuItem}
								onClick={()=>handleLobby(item.value)}
								>
								{item.icon}
								<span className={styles.whMenuItemSpan}>
									{item.title}
								</span>
							</div>
						);
				})}
				<div className={styles.whMenuItem}>
					<MdOutlineLogout size='40'  onClick={handleLogout} />
					<span className={styles.whMenuItemSpan} onClick={handleLogout}>Logout</span>
				</div>
		</div>
	);
}

export default NavBar;