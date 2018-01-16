import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const onceGetUsers = () => db.ref('users').once.apply('value');
export const onceGetResevations = () => db.ref('reservations').once('value');
export const updateReservations = (item) => db.ref('reservations').push(item);
export const removeReservation = (item) => db.ref('reservations').child(item).remove();