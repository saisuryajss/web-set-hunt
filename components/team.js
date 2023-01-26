import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { UPDATE_USER } from '../reducers/userReducer';
import styles from '../styles/Home4.module.css';
import networkRequest from '../utils/request';
import customToast from '../utils/toast';

function Team() {
    const [isCreateTeam, setIsCreateTeam] = useState(true);
    const user = useSelector(state => state.user);
    const teamNameRef = useRef();
    const teamCodeRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [user]);

    async function handleCreateTeam(event) {
        event.preventDefault();
        if (teamNameRef && teamNameRef.current && teamNameRef.current.value) {
            const url = process.env.NEXTAUTH_URL + '/api/team/createTeam';
            const data = {
                teamName: teamNameRef.current.value
            };
            const response = await networkRequest('POST', url, data);
            console.log(response);
            if (response.status === 200) {
                customToast(response?.data?.message ? response.data.message : 'Created Team', 'success');
                const { teamName, teamId } = response.data.team;
                const newObj = {
                    ...user,
                    teamId,
                    teamName
                };
                dispatch(UPDATE_USER(newObj))
            }
            else {
                customToast(response?.data?.message ? response.data.message : 'Team Creation Failed', 'failure');
            }
        }
        else {
            customToast('Invalid Team Name', 'failure');
        }
    }

    function handleClick(val) {
        setIsCreateTeam((prev) => {
            if (val === 'create')
                return true;
            else
                return false;
        })
    }

    return (
        <div className={styles.teamContainer}>
            <ToastContainer />
            {
                user && user.teamName && user.teamId ?
                    <div className={styles.teamDetails+" "+styles.teamJoined}>
                        <h1>You are already in a team</h1>
                        <div className={styles.teamNameCode}>
                            <label>Team Name</label>
                            <input type='text' value={user.teamName} disabled />
                        </div>
                        <div className={styles.teamNameCode}>
                            <label>Team Code</label>
                            <input type='text' value={user.teamId} disabled />
                        </div>
                    </div>
                    : <div className={styles.teamDetails}>
                        <div className={styles.teamJoiningOptions}>
                            <button onClick={() => handleClick('create')} className={`${isCreateTeam ? styles.teamCreationButtonActive : styles.teamCreationButtonInActive}`}>Create Team</button>
                            <button onClick={() => handleClick('join')} className={!isCreateTeam ? styles.teamCreationButtonActive : styles.teamCreationButtonInActive}>Join Team</button>
                        </div>
                        {
                            isCreateTeam ?
                                <div className={styles.teamCreation}>
                                    <form>
                                        <input type='text' placeholder='Team Name...' required ref={teamNameRef} />
                                        <button onClick={handleCreateTeam}>Create</button>
                                    </form>
                                </div>
                                :
                                <div className={styles.teamCreation}>
                                    <form >
                                        <input type='text' placeholder='Team Code...' required ref={teamCodeRef} />
                                        <button onClick={handleJoinTeam}>Join</button>
                                    </form>
                                </div>
                        }</div>
            }

        </div>
    )
}

export default Team;