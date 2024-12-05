export const handleRequest = async (action, error) => {
  try {
    await action();
  } catch (err) {
    console.log(err);

    if (error) {
      await error();
    }
  }
}