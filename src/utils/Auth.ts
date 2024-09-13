let isAuth = false;

export function setIsAuth(value: boolean): void {
    isAuth = value;
    localStorage.setItem('isAuth', JSON.stringify(value));
}