import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

  const saveFile = new SaveFile();
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs');
    if (outputFolderExist) fs.rmSync('outputs', { recursive: true });

    const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
    if (customOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });


  })

  // beforeEach(() => {
  //   jest.restoreAllMocks(); //restaura el funcionamiento original de mkdirSync, para que no afecte a otras pruebas
  // })

  test('should save a file with default values', () => {

    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content'
    }


    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath); //puede dar un falso positivo si esta creado previamente
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);

  });


  test('should save file with custom values', () => {
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath); //puede dar un falso positivo si esta creado previamente
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);

  })


  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    //mockImplementation
    /**
     * espia el metodo mkdirSync, y la funcion mockImplementation reescribe el funcionamiento de la funcion.
     * En este caso, cada vez que se llame a mkdirSync, en lugar de crear un directorio, lanzará un error 
     * simulado.
     *  Esto nos permite probar cómo se comporta el método execute cuando ocurre un error al intentar 
     * crear el directorio.
     */
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => { throw new Error('Mocked error creating directory') }
    );

    const result = saveFile.execute(customOptions);
    expect(result).toBe(false);

    mkdirSpy.mockRestore(); //restaura el funcionamiento original de mkdirSync, para que no afecte a otras pruebas

  })


  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => { throw new Error('this is a custom writin error message') }
    );
    const result = saveFile.execute({ fileContent: 'hola' });
    expect(result).toBe(false);

    writeFileSpy.mockRestore(); //restaura el funcionamiento original de writeFileSync, para que no afecte a otras pruebas
  })

});