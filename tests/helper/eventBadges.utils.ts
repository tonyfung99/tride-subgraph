import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { log, newMockEvent } from "matchstick-as";
import {
  createdEventSession,
  TransferBatch,
  TransferSingle,
  updatedEventSession,
} from "../../generated/templates/EventBadge/EventBadge";

export function createCreatedEventSession(
  eventBadgesAddress: Address,
  callerAddress: Address,
  sessionId: i32,
  sessionInfo: ethereum.Tuple
): createdEventSession {
  let mockEvent = changetype<createdEventSession>(newMockEvent());
  mockEvent.address = eventBadgesAddress;
  mockEvent.parameters = new Array();

  const callerParam = new ethereum.EventParam(
    "caller",
    ethereum.Value.fromAddress(callerAddress)
  );

  const sessionIdParam = new ethereum.EventParam(
    "sessionId",
    ethereum.Value.fromI32(sessionId)
  );

  const sessionParam = new ethereum.EventParam(
    "session",
    ethereum.Value.fromTuple(sessionInfo)
  );

  mockEvent.parameters.push(callerParam);
  mockEvent.parameters.push(sessionIdParam);
  mockEvent.parameters.push(sessionParam);

  return mockEvent;
}

export function createUpdatedEventSession(
  eventBadgesAddress: Address,
  callerAddress: Address,
  sessionId: i32,
  sessionInfo: ethereum.Tuple
): updatedEventSession {
  let mockEvent = changetype<updatedEventSession>(newMockEvent());
  mockEvent.address = eventBadgesAddress;
  mockEvent.parameters = new Array();

  const callerParam = new ethereum.EventParam(
    "caller",
    ethereum.Value.fromAddress(callerAddress)
  );

  const sessionIdParam = new ethereum.EventParam(
    "sessionId",
    ethereum.Value.fromI32(sessionId)
  );

  const sessionParam = new ethereum.EventParam(
    "session",
    ethereum.Value.fromTuple(sessionInfo)
  );

  mockEvent.parameters.push(callerParam);
  mockEvent.parameters.push(sessionIdParam);
  mockEvent.parameters.push(sessionParam);

  return mockEvent;
}

export function createTransferSignle(
  eventBadgesAddress: Address,
  toAddress: Address,
  tokenId: i32
): TransferSingle {
  let mockEvent = changetype<TransferSingle>(newMockEvent());
  mockEvent.address = eventBadgesAddress;
  mockEvent.parameters = new Array();

  const operatorParam = new ethereum.EventParam(
    "operator",
    ethereum.Value.fromAddress(toAddress)
  );

  const fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(
      Address.fromString("0x0000000000000000000000000000000000000000")
    )
  );

  const toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(toAddress)
  );

  const tokenIdParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromI32(tokenId)
  );

  const valueParam = new ethereum.EventParam(
    "value",
    ethereum.Value.fromString("")
  );

  mockEvent.parameters.push(operatorParam);
  mockEvent.parameters.push(fromParam);
  mockEvent.parameters.push(toParam);
  mockEvent.parameters.push(tokenIdParam);
  mockEvent.parameters.push(valueParam);

  return mockEvent;
}
