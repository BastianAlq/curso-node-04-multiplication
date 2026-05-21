
//import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]
  const { yarg } = await import('./args.plugin.ts');

  return yarg;
}


describe('Test args.plugin.ts', () => {

  test('should return default values', async () => {

    //
    const argv = await runCommand(['-b', '5']);
    console.log(process.argv)

    //console.log({ yargs })
    expect(argv).toEqual({

    })
  });
})