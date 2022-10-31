import { ipfs, log } from "@graphprotocol/graph-ts";
import { Event, EventBadge } from "../generated/schema";
import {
  createdEventSession,
  updatedEventSession,
  addedInvitee,
  TransferSingle,
} from "../generated/templates/EventBadge/EventBadge";
import {
  getJSONFromIPFS,
  getOrCreateArray,
  getOrCreateUser,
  getValueFromJSON,
} from "./helper/utils";

// - event: createdEventSession(indexed address,uint256,(string,string,uint256,uint256,string,string,uint256))
// handler: handleCreateEventSession

export function handleCreateEventSession(event: createdEventSession): void {
  let eventObj = new Event(event.address.toHex());

  if (eventObj != null) {
    const objId =
      event.address.toHex() + "-" + event.params.sessionId.toString();
    let eventBadgeObj = new EventBadge(objId);

    eventBadgeObj.tokenId = event.params.sessionId;
    eventBadgeObj.name = event.params.session.name;
    eventBadgeObj.description = event.params.session.description;
    eventBadgeObj.start_time = event.params.session.start_time;
    eventBadgeObj.end_time = event.params.session.end_time;
    eventBadgeObj.role = event.params.session.role;
    eventBadgeObj.quota = event.params.session.quota;
    eventBadgeObj.contentURL = event.params.session.contentUri;
    eventBadgeObj.event = eventObj.id;

    const ipfs_data = getJSONFromIPFS(event.params.session.contentUri);
    eventBadgeObj.image = getValueFromJSON(ipfs_data, "image");
    if (ipfs_data) {
    }

    eventBadgeObj.save();

    log.info("[SELF-INFO]Created Event Badges | id: {}", [eventBadgeObj.id]);
  }
}
export function handleUpdateEventSession(event: updatedEventSession): void {
  const objId = event.address.toHex() + "-" + event.params.sessionId.toString();
  let eventBadgeObj = EventBadge.load(objId);

  if (eventBadgeObj != null) {
    eventBadgeObj.tokenId = event.params.sessionId;
    eventBadgeObj.name = event.params.session.name;
    eventBadgeObj.description = event.params.session.description;
    eventBadgeObj.start_time = event.params.session.start_time;
    eventBadgeObj.end_time = event.params.session.end_time;
    eventBadgeObj.role = event.params.session.role;
    eventBadgeObj.quota = event.params.session.quota;
    eventBadgeObj.contentURL = event.params.session.contentUri;
    eventBadgeObj.save();

    log.info("[SELF-INFO]Updated Event Badges | id: {}", [eventBadgeObj.id]);
  }
}
export function handleAddedInvitee(event: addedInvitee): void {}

export function handleMint(event: TransferSingle): void {
  let ownerAddress = event.params.to;
  const owner = getOrCreateUser(ownerAddress);

  let eventBadgeId = event.address.toHex() + "-" + event.params.id.toString();

  let currentOwnedBadges = getOrCreateArray(owner.badge);
  currentOwnedBadges.push(eventBadgeId);
  owner.badge = currentOwnedBadges;
  owner.save();
}
