export const toDateWithoutHours = (value: any) => {
    let date = new Date(value.obj.date);
    date.setHours(0, 0, 0, 0);
    return date;
}