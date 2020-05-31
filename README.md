# Foodtruck TrakR Back-End

## Endpoints

- welcome https://food-truck-back-end.herokuapp.com

## TO REGISTER/LOGIN/LOGOUT

- diners: /diners/auth/(action_name)
- operators: /operators/auth/(action_name)

## CRUD OPERATIONS

- diners: getDinerById, updateDiner, deleteDiner ==> /diners/:id
- operators: getOperatorById, updateOperator, deleteOperator ==> /operators/:id
- trucks getOperatorsTrucks, addTruck ==> /operators/:id/trucks
  getTruckById, updateTruck, deleteTruck ==> /operators/:id/trucks/:truck_id
- more endpoints coming soon...
