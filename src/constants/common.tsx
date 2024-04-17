export const TABS = ["Cw20", "Cw721", ] as const;
export type TAB_TYPE = typeof TABS[number];

export const NETWORKS = ["MAINNET", "TESTNET"] as const;
export type NETWORK_TYPE = typeof NETWORKS[number];

export const MODES = ["DEPLOY", "RECOVER"] as const;
export type MODE_TYPE = typeof MODES[number];