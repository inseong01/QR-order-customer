import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path';


/**
 * zustand "production" 환경 디버그 코드 제거
 *  
 * 적용 파일
 *  - store/*-slice.ts 
 */
async function updateStoreFile(fullPath) {
  try {
    const txt = await readFile(fullPath, { encoding: 'utf-8' });

    const standard = txt.match(/:\s*\((?:set|_)(?:,\s*get)?\)\s*=>\s*\({/);
    const dev_txt = txt.split(standard)[0];
    const prod_txt = txt.split(standard)[1];

    const debugCodeArr = prod_txt.match(/,\s*undefined\s*,\s*"[^"]*"/g);
    if (!debugCodeArr) return console.log(`No matching code found. It's already clean.`);

    const rs_table = debugCodeArr.map((value) => {
      const keyValue = value.split(/,\s*/);
      return { list: keyValue[2].replaceAll('"', '') }
    })

    const removedDebugCode = prod_txt.replace(/,\s*undefined\s*,\s*"[^"]*"/g, '');

    const updated_txt = dev_txt + standard + removedDebugCode;

    const rs_w = await writeFile(fullPath, updated_txt);

    console.log(rs_w ?? `Success, file is updated!`)
    console.table(rs_table)
  } catch (err) {
    console.error(err)
  } finally {
    console.log('ㅡ', fullPath, '\n')
  }
}

/**
 * store 디렉터리 재귀 탐색
 * 
 * 적용 디렉터리
 * - /store
 * 
 * 찾는 파일
 * - *-slice.ts 
 */
async function scanStoreDir() {
  const root = await readdir('./src/lib/store/')

  async function findStoreFile(root, ptArr) {
    for (const pt of ptArr) {
      const fullPath = path.join(root, pt)
      const isTs = fullPath.endsWith('.ts');

      if (!isTs) {
        const childPath = await readdir(fullPath)
        findStoreFile(fullPath, childPath);
        continue;
      }

      const isExceptionPath = fullPath.includes('use-bound-store.ts');
      if (isExceptionPath) continue;

      updateStoreFile(fullPath);
    }
  }

  findStoreFile('./src/lib/store/', root)
}

scanStoreDir()