export const getPageList = (state, page) => state.pagination[page];
export const getUser = (state, id) => state.entities.users[id];
export const getUserExists = (state, id) => !!state.entityDontExist.users[id];
