import {
  assert,
  describe,
  test,
  beforeAll,
  mockIpfsFile,
  dataSourceMock,
} from "matchstick-as/assembly/index";
import { Address, dataSource, JSONValue, Value } from "@graphprotocol/graph-ts";
import {
  handleCreateOrganisation,
  handleEventCreatedEvent,
  handleUpdateOrganisation,
} from "../src/organisation";
import {
  createCreateOrgProfileEvent,
  createEventCreatedEvent,
  createUpdateOrgProfileEvent,
} from "./helper/organisation.utils";
import { log } from "matchstick-as/assembly/log";

import { processItem } from "../src/Organisation";
import { mockEventBadgesAddress } from "./__setup.test";
export { processItem } from "../src/Organisation";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

const SKILL_CID = "bafybeiavqybeku2nx4gm5dzqxde2qf3kfqa7jvihrsvf52ovhqk5trccee";

export function processItem2(value: JSONValue, userData: Value): void {
  // See the JSONValue documentation for details on dealing
  // with JSON values
  let obj = value.toObject();

  if (!obj) {
    return;
  }
  let id = obj.get("id");
  let name = obj.get("name");
  let desc = obj.get("description");

  // let typeObj = obj.get("type");
  // let type = typeObj? typeObj.toObject().get("name") : null;

  log.warning("processingItem...", []);
  if (!id || !name) {
    log.warning("data is null...!", []);
    return;
  }

  if (desc) {
    if (!desc.isNull()) {
      log.warning("for each item, desc {}", [desc.toString()]);
    }
  }

  log.warning("for each item, id {} ", [id.toString()]);
  log.warning("for each item, name {}", [name.toString()]);

  // Callbacks can also created entities
  // let newItem = new Skill(id.toString());
  // newItem.name = name.toString();
  // newItem.description = desc.toString();

  // if (typeObj) {
  //   newItem.type = type.toString();
  // }
  // newItem.save();
}

// describe("IPFS checking", () => {
//   beforeAll(() => {
//     let previousAdmin = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     );
//     let newAdmin = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     );

//     mockIpfsFile("ipfsCatFileHash", "tests/lightcast.json");
//     mockIpfsFile("ipfsCatFileHash-trim", "tests/lightcast-simple.json");
//   });

//   afterAll(() => {
//     clearStore();
//   });

//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

//   test("ipfs.map", () => {
//     ipfs.mapJSON(
//       "ipfsCatFileHash-trim",
//       "processItem",
//       Value.fromString("Skills")
//     );
//     assert.entityCount("Skill", 8);
//   });

//   test("ipfs.map function calling", () => {
//     createIPFS("ipfsCatFileHash-trim");
//     assert.entityCount("Skill", 8);

//     assert.fieldEquals(
//       "Skill",
//       "KS126XS6CQCFGC3NG79X",
//       "name",
//       ".NET Assemblies"
//     );
//   });
// });

describe("Organisation", () => {
  beforeAll(() => {
    mockIpfsFile(
      "FAKE_ORGANISATION_1",
      "tests/ipfs_file/organisations/organisation_1.json"
    );
    mockIpfsFile(
      "FAKE_ORGANISATION_2",
      "tests/ipfs_file/organisations/organisation_2.json"
    );
  });

  test("Can store organisation", () => {
    handleCreateOrganisation(
      createCreateOrgProfileEvent(
        0,
        "Org_1",
        "description of Org_1",
        "ipfs://FAKE_ORGANISATION_1"
      )
    );

    assert.fieldEquals("Organisation", "0", "id", "0");
    assert.fieldEquals("Organisation", "0", "name", "Org_1");
    assert.fieldEquals(
      "Organisation",
      "0",
      "description",
      "description of Org_1"
    );
    assert.fieldEquals(
      "Organisation",
      "0",
      "metadataURI",
      "ipfs://FAKE_ORGANISATION_1"
    );
    assert.fieldEquals(
      "Organisation",
      "0",
      "websiteURL",
      "https://www.esperanza.life/"
    );
    assert.fieldEquals("Organisation", "0", "twitterId", "/");
    assert.fieldEquals("Organisation", "0", "discordServer", "/");
    assert.fieldEquals("Organisation", "0", "contactEmail", "/");
    assert.fieldEquals("Organisation", "0", "industry", "/");
  });

  test("Can update organisation inforamtion", () => {
    let firstAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );

    handleCreateOrganisation(
      createCreateOrgProfileEvent(
        0,
        "Org_1",
        "description of Org_1",
        "ipfs://FAKE_ORGANISATION_1"
      )
    );

    handleUpdateOrganisation(
      createUpdateOrgProfileEvent(
        0,
        firstAdmin,
        "Org_1_update",
        "description of Org_1",
        "ipfs://FAKE_ORGANISATION_2"
      )
    );
    assert.fieldEquals("Organisation", "0", "id", "0");
    assert.fieldEquals("Organisation", "0", "name", "Org_1_update");
    assert.fieldEquals(
      "Organisation",
      "0",
      "description",
      "description of Org_1"
    );
    assert.fieldEquals(
      "Organisation",
      "0",
      "metadataURI",
      "ipfs://FAKE_ORGANISATION_2"
    );
    assert.fieldEquals(
      "Organisation",
      "0",
      "websiteURL",
      "https://www.esperanza.life/"
    );
    assert.fieldEquals("Organisation", "0", "twitterId", "/");
    assert.fieldEquals("Organisation", "0", "discordServer", "/");
    assert.fieldEquals("Organisation", "0", "contactEmail", "/");
    assert.fieldEquals("Organisation", "0", "industry", "updated");
  });

  test("Can create event and start monitor the event badges contract", () => {
    let newContract = Address.fromString(mockEventBadgesAddress);

    handleEventCreatedEvent(
      createEventCreatedEvent(0, "code", "name", 0, 1, newContract)
    );

    assert.fieldEquals("Event", newContract.toHex(), "id", newContract.toHex());
    assert.fieldEquals("Event", newContract.toHex(), "code", "code");
    assert.fieldEquals("Event", newContract.toHex(), "name", "name");
    assert.fieldEquals("Event", newContract.toHex(), "start_date", "0");
    assert.fieldEquals("Event", newContract.toHex(), "end_date", "1");
    assert.fieldEquals("Event", newContract.toHex(), "organisation", "0");
  });
});
