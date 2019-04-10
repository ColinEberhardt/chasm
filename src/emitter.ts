
// https://webassembly.github.io/spec/core/binary/modules.html#binary-module
const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];

export const emitter: Emitter = () => {
  const buffer = [
    ...magicModuleHeader,
    ...moduleVersion,
  ];
  return Uint8Array.from(buffer);
};
