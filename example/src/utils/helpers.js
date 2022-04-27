export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((i) => ({ label: i, value: i}));

export const days = [...new Array(31)].map((index) => index + 1).map((i) => ({ label: i, value: i}));

export const homeYears = [...new Array(new Date().getFullYear() - 1970)].map((index) => index + 1971).reverse().map((i) => ({ label: i, value: i}));

export const dobYears = [...new Array(new Date().getFullYear() - 1920)].map((index) => index + 1921).reverse().map((i) => ({ label: i, value: i}));
