// typescript/agentkit/src/utils/address.ts

/** Returns true if `value` is a 0x-prefixed hex string (optionally exact length in bytes). */
export function isHexString(value: unknown, bytes?: number): value is `0x${string}` {
  if (typeof value !== "string") return false;
  if (!value.startsWith("0x")) return false;

  const hex = value.slice(2);
  if (hex.length === 0) return false;
  if (!/^[0-9a-fA-F]+$/.test(hex)) return false;

  if (bytes != null) {
    return hex.length === bytes * 2;
  }
  return hex.length % 2 === 0;
}

/** Lightweight EVM address check (no checksum validation). */
export function isEvmAddress(value: unknown): value is `0x${string}` {
  return isHexString(value, 20);
}

/** 0x1234…abcd formatter for UI/logs. */
export function shortenAddress(address: string, left = 6, right = 4): string {
  if (typeof address !== "string") return String(address);
  if (!address.startsWith("0x") || address.length <= 2 + left + right) return address;
  return `${address.slice(0, 2 + left)}…${address.slice(-right)}`;
}
