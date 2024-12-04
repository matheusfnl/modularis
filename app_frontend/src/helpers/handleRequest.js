export const handleRequest = async (action, error) => {
  try {
    await action();
  } catch (err) {
    if (error) {
      await error();
    } else {
      console.error(err);
    }
  }
}