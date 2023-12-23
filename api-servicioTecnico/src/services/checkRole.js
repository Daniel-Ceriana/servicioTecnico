const actions = {
  create: ["admin", "editor"],
  edit: ["admin", "editor"],
  delete: ["admin"],
};

const validateAutorizationHelper = (userRole, action) => {
  if (actions[action].filter((role) => role === userRole).length) {
    return true;
  }
  return false;
};

//
const validateAutorization = {
  create: (create = (userRole) => {
    return validateAutorizationHelper(userRole, "create");
  }),
  edit: (edit = (userRole) => {
    return validateAutorizationHelper(userRole, "edit");
  }),
  delete: (deleteProduct = (userRole) => {
    return validateAutorizationHelper(userRole, "delete");
  }),
};
module.exports = { validateAutorization };
