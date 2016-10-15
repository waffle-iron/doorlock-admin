import queryEntity from './queryEntity';
import * as entitiesActions from '../redux-Actions/entitiesActions';
import {
  fetchUser,
  fetchUsers,
  deleteUser } from '../utils/entitiesApi';


const pageService = {
  members: {
    fetch: queryEntity.bind(null, entitiesActions.members.get, fetchUsers),
    fetchOne: queryEntity.bind(null, entitiesActions.members.get, fetchUser),
    delete: queryEntity.bind(null, entitiesActions.members.delete, deleteUser)
  }
}

export default pageService;
