import commandLineArgs from 'command-line-args';
import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV) {
  // Set the env file
  const result = dotenv.config({
    path: path.join(__dirname, `../env/${process.env.NODE_ENV}.env`),
  });

  if (result.error) {
    throw result.error;
  }
} else {
  // Setup command line options
  const options = commandLineArgs([
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'local',
      type: String,
    },
  ]);

  // Set the env file
  const result = dotenv.config({
    path: path.join(__dirname, `../env/${options.env}.env`),
  });

  if (result.error) {
    throw result.error;
  }
}
