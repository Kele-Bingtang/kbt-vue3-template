import snowflake from "./snowflakes";

/**
 * @description 雪花算法 ID
 */
export const useSnowflakeId = () => {
  return snowflake.nextId();
};

/**
 * @description 生成唯一 uuid，带有 -
 */
export const useUuid = () => {
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === "function" && typeof Uint8Array === "function") {
      const callback = (c: any) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performanceNow = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
};

/**
 * @description 没有 `-` 的 uuid
 */
export const useSimpleUuid = () => {
  return useUuid().replace(/-/g, "");
};

/**
 * @description 随机字符串
 */
export const toAnyString = () => {
  const str: string = "xxxxx-xxxxx-4xxxx-yxxxx-xxxxx".replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0;
    const v: number = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString();
  });
  return str;
};

/**
 *  随机生成指定长度字符串
 * @param length 长度，默认 32
 */
export const randomString = (length = 32) => {
  /**
   * 生成一个指定长度的随机字符串。
   *
   * @param length 随机字符串的长度
   * @returns 生成的随机字符串
   */
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 字符集
  let result = "";

  for (let i = 0; i < length; i++) {
    // 从字符集中随机选择一个字符并添加到结果字符串中
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
