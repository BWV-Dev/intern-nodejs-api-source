export const messages = {
  authError: '権限がありません。',
  dbUnknownError:
    'データベースエラーが発生しました。システム管理者にお問い合わせください。',
  fileUploadSizeError: (size: string) =>
    `アップロードサイズの上限(${size})を超えています。`,
  undefinedValueError: ($1: string) => `定義されていない入力です。(${$1})`,
  notFoundParameterError: (paramName: string) =>
    `データベースに登録されていないため処理に失敗しました(${paramName})`,
  passwordError: 'ユーザ名またはパスワードが間違っています。',
  dataMismatchingError:
    'データ不整合のため処理を実行出来ませんでした。システム管理者にお問い合わせください。',
  systemError: 'システムエラーが発生しました。',
  duplicateValueError: ($1: string) => `すでに使用されている${$1}です。`,
  invalidTokenError: 'INVALID_TOKEN',
  imageUploadSizeError: (size: string) =>
    `画像アップロードサイズの上限(${size}MB)を超えています。`,
  imageUploadTypeError:
    '画像の形式が正しくありません。png, jpeg, jpgをアップロードしてください。',
  emailFormatError: `メールアドレスの形式が正しくありません。`,
  documentUploadTypeError:
    '資料の形式が正しくありません。xlsx, doc, pptx, pdf, png, jpg, jpegをアップロードしてください。',
  documentUploadSizeError: (size: string) =>
    `資料アップロードサイズの上限(${size})を超えています。`,
  fileImportSizeError: (size: string) =>
    `取り込みファイルサイズの上限(${size}MB)を超えています。`,
  fileImportFormatError: `取り込みファイルがCSV形式ではありません。`,
  fileImportCharsetError: `取り込みファイルの文字コードが正しくありません。`,
  fileImportTypeError: `許可されていない取込ファイルです。`,
  invalidEmailAddressError: '有効なメールアドレスではありません。',
  invalidPassAuthKeyError:
    '無効なURLです。パスワード再発行メールから1時間を経過している場合、再度パスワードの再発行を行って下さい。',
  EBT096: '登録・更新・削除処理に成功しました。',
};

export const validatorMessages = {
  checkRequired: (column: string) => `${column} is required field.`,
  checkMaxLength: (column: string, length: string | number) =>
    `${column} must be less than ${length} characters.`,
  checkMinLength: (column: string, length: string | number) =>
    `${column} must be more than ${length} characters.`,
  checkType: (column: string, type: string) =>
    `Only ${type} can be entered for ${column}.`,
  checkRequiredOneOf: (columns: string) =>
    `Allow only 1 field from [${columns}].`,
  checkIsPositiveInteger: (column: string) =>
    `Only accept positive number for ${column}.`,
  checkIsValid: (column: string) => `Please enter a valid ${column}.`,
  checkEmailExist: 'Email have been exist.',
  emailNotExist: 'Email not exist',
  EBT033: (formatFile: string) =>
    `ファイル形式が誤っています。${formatFile}を選択してください。`,
  EBT034: (fileSize: string) =>
    `ファイルのサイズ制限${fileSize}を超えています。`,
  EBT095: 'インポートファイルの中身が正しくありません。',
  E009: (name: string) => `${name} is duplicated.`,
};

export enum Position {
  'Director',
  'Group Leader',
  'Leader',
  'Member',
}
