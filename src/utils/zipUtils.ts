import JSZip from "jszip";

interface ILogResult {
  files: string[];
  content: string[];
}
export const getLogsFromZipFile = async (
  zipContent: Blob
): Promise<ILogResult> => {
  const zip = new JSZip();
  await zip.loadAsync(zipContent);
  const logDirectoryName = Object.keys(zip.files).find(
    (key) => zip.files[key].dir
  );
  if (!logDirectoryName) {
    return { files: [], content: [] };
  }

  const files = Object.keys(zip.files)
    .filter((f) => f.startsWith(logDirectoryName))
    .sort((a, b) => {
      const a1 = parseFloat(a.replace(logDirectoryName, "").split("_")[0]);
      const b1 = parseFloat(b.replace(logDirectoryName, "").split("_")[0]);
      return a1 - b1;
    });

  const fileContents = await Promise.all(
    files.map(async (file) => await zip.files[file].async("string"))
  );
  const fileNames = files
    .map((f) => f.replace(logDirectoryName, ""))
    .map((f) => f.split(".").slice(0, -1).join("."))
    .map((f) => `${f.split("_")[0]} – ${f.split("_").slice(1).join("_")}`);
  return {
    files: fileNames,
    content: fileContents,
  };
};
