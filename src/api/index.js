import ajax from './ajax';

export const reqLogin = (username, password) => ajax('/customers/login', { username, password }, 'POST');
export const reqLocations = () => ajax('/locations', {}, 'GET');
export const reqAvailableVehicle = (data) => ajax('/vehicles', data, 'POST');
export const reqAvailableCoupons = () => ajax('/coupons/valid', {}, 'GET');
export const reqPaidOrders = () => ajax('/orders/paid', {}, 'GET');
export const reqDroppedoffOrders = () => ajax('/orders/dropped_off', {}, 'GET');
export const reqReserveVehicle = (data) => ajax('/orders/reserve', data, 'POST');
export const reqReservedOrders = () => ajax('/orders/reserved', {}, 'GET');
export const reqPickedupOrders = () => ajax('/orders/picked_up', {}, 'GET');
export const reqProcessPayment = (data) => ajax('/orders/payments', data, 'POST');
export const reqCustomerRegister = (data) => ajax('/customers/register/individual', data, 'POST');
export const reqCorporateRegister = (data) => ajax('/customers/register/corporate', data, 'POST');
export const reqAddCoupon = (data) =>  ajax('/admin/coupons', data, 'POST');
export const reqAssignDiscount = (data) => ajax('/admin/discounts', data, 'PUT');
export const reqManageDropoff = (data) => ajax('/admin/orders/drop_off', data, 'PUT');
export const reqManagePickup = (data) => ajax('/admin/orders/pick_up', data, 'PUT');
export const reqChangePassword = (data) => ajax('/customers/password', data, 'PUT');