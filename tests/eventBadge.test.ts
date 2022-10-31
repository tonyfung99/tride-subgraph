import { Address } from "@graphprotocol/graph-ts";
import { assert, describe, log, test } from "matchstick-as";
import { User } from "../generated/schema";
import {
  handleCreateEventSession,
  handleMint,
  handleUpdateEventSession,
} from "../src/eventBadge";
import { getOrCreateArray, getOrCreateUser } from "../src/helper/utils";
import { mockEventSessionParam } from "./helper/common";
import {
  createCreatedEventSession,
  createTransferSignle,
  createUpdatedEventSession,
} from "./helper/eventBadges.utils";
import { mockEventBadgesAddress, mockUser } from "./__setup.test";

describe("Event Badge information", () => {
  test("Can create event badges", () => {
    const fakeEventSessionName = "MockEventSession";
    const eventBadgesAddress = Address.fromString(mockEventBadgesAddress);
    const callerAddress = Address.fromString(mockUser);
    const sessionId = 0;
    const sessionInfo = mockEventSessionParam(fakeEventSessionName);

    handleCreateEventSession(
      createCreatedEventSession(
        eventBadgesAddress,
        callerAddress,
        sessionId,
        sessionInfo
      )
    );

    const targetId = eventBadgesAddress.toHex() + "-" + sessionId.toString();
    assert.fieldEquals("EventBadge", targetId, "id", targetId);
    assert.fieldEquals("EventBadge", targetId, "name", fakeEventSessionName);
  });

  test("Can update event badges", () => {
    const newEventSessionName = "MockEventSession_1";
    const eventBadgesAddress = Address.fromString(mockEventBadgesAddress);
    const callerAddress = Address.fromString(mockUser);
    const sessionId = 0;
    const sessionInfo = mockEventSessionParam(newEventSessionName);

    handleUpdateEventSession(
      createUpdatedEventSession(
        eventBadgesAddress,
        callerAddress,
        sessionId,
        sessionInfo
      )
    );

    const targetId = eventBadgesAddress.toHex() + "-" + sessionId.toString();
    assert.fieldEquals("EventBadge", targetId, "id", targetId);
    assert.fieldEquals("EventBadge", targetId, "name", newEventSessionName);
  });
});

describe("Event Badge mint", () => {
  test("Can record badge owner thought TransferSingle", () => {
    const eventBadgesAddress = Address.fromString(mockEventBadgesAddress);
    const userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    const tokenId = 0;

    handleMint(createTransferSignle(eventBadgesAddress, userAddress, tokenId));

    let targetId = `${mockEventBadgesAddress}-${tokenId}`;
    let isContainBadge = false;

    const user = getOrCreateUser(userAddress);
    const userOwnedBadge = getOrCreateArray(user.badge);

    for (let i = 0, k = userOwnedBadge.length; i < k; ++i) {
      if (userOwnedBadge[i].toString() == targetId) {
        isContainBadge = isContainBadge || true;
      }
    }

    assert.assertTrue(isContainBadge);
  });
});
