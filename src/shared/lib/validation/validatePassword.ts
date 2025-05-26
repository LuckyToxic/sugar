export function validatePassword(password: string): boolean {
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const digit = /\d/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    uppercase.test(password) &&
    digit.test(password) &&
    specialChar.test(password)
  );
}
