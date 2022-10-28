import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  createOrgProfileEvent,
  EventCreatedEvent,
  updateOrgProfileEvent,
  Upgraded
} from "../generated/Organisation/Organisation"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createCreateOrgProfileEvent(
  id: i32, 
  name: string, 
  description: string, 
  uri: string)
: createOrgProfileEvent{
  let event = changetype<createOrgProfileEvent>(newMockEvent());
  event.parameters = new Array();

  let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id))

  let eventBadgeArray: Address[] = new Array()

  let orgInfoArray: Array<ethereum.Value> = [
    ethereum.Value.fromString(name),
    ethereum.Value.fromString(description),
    ethereum.Value.fromString(uri),
    ethereum.Value.fromAddressArray(eventBadgeArray),
  ]
  let orgInfo = changetype<ethereum.Tuple>(orgInfoArray);

  let orgParam = new ethereum.EventParam("orgInfo", ethereum.Value.fromTuple(orgInfo))

  event.parameters.push(idParam)
  event.parameters.push(orgParam)

  return event
}

export function createUpdateOrgProfileEvent(
  id: i32,
  operatorAddress: Address, 
  name: string, 
  description: string, 
  uri: string)
: updateOrgProfileEvent{
  let event = changetype<updateOrgProfileEvent>(newMockEvent());
  event.parameters = new Array();

  let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id))
  let operatorParam = new ethereum.EventParam("operatorAddress", ethereum.Value.fromAddress(operatorAddress))

  let eventBadgeArray: Address[] = new Array()

  let orgInfoArray: Array<ethereum.Value> = [
    ethereum.Value.fromString(name),
    ethereum.Value.fromString(description),
    ethereum.Value.fromString(uri),
    ethereum.Value.fromAddressArray(eventBadgeArray),
  ]
  let orgInfo = changetype<ethereum.Tuple>(orgInfoArray);

  let orgParam = new ethereum.EventParam("orgInfo", ethereum.Value.fromTuple(orgInfo))

  event.parameters.push(idParam)
  event.parameters.push(operatorParam)
  event.parameters.push(orgParam)

  return event
}

export function createEventCreatedEvent(
  orgId: i32,
  code: string,
  name: string,
  start_date:i32,
  end_date: i32,
  eventAddress: Address
)
: EventCreatedEvent{
  // @todo
  let event = changetype<EventCreatedEvent>(newMockEvent());
  event.parameters = new Array();

  const orgIdParam = new ethereum.EventParam("OrgId", ethereum.Value.fromI32(orgId))
  const codeParam = new ethereum.EventParam("code", ethereum.Value.fromString(code))
  const nameParam = new ethereum.EventParam("name", ethereum.Value.fromString(name))
  const startDateParam = new ethereum.EventParam("start_date", ethereum.Value.fromI32(start_date))
  const endDateParam = new ethereum.EventParam("end_date", ethereum.Value.fromI32(end_date))
  const contractAddressParam = new ethereum.EventParam("eventAddress", ethereum.Value.fromAddress(eventAddress))


  event.parameters.push(orgIdParam)
  event.parameters.push(codeParam)
  event.parameters.push(nameParam)
  event.parameters.push(startDateParam)
  event.parameters.push(endDateParam)
  event.parameters.push(contractAddressParam)

  return event
}