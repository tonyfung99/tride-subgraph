import { ethereum, BigInt } from "@graphprotocol/graph-ts";

export interface EventSession {
  name: string;
  description: string;
  start_time: BigInt;
  end_time: BigInt;
  role: string;
  contentUri: string;
  quota: BigInt;
}

export function mockEventSessionParam(name: string): ethereum.Tuple {
  let returnParamArray: Array<ethereum.Value> = [
    ethereum.Value.fromString(name),
    ethereum.Value.fromString("MockEventSession_Description"),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0)),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
    ethereum.Value.fromString("MockEventSession_role"),
    ethereum.Value.fromString("FAKE_EVENT_BADGE_1"),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0)),
  ];
  return changetype<ethereum.Tuple>(returnParamArray);
}
