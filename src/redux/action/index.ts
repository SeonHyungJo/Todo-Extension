export const TEST = 'TEST';

function test(text: string) {
  return {
    type: TEST,
    payload: {
      text: text,
    },
  };
}

export const actionCreators = {
  test,
};
