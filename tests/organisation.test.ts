import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  mockIpfsFile,
} from "matchstick-as/assembly/index";
import { Address, ipfs, JSONValue, Value } from "@graphprotocol/graph-ts";
import { Organisation, Skill } from "../generated/schema";
import {
  AdminChanged,
  Initialized,
} from "../generated/Organisation/Organisation";
import { createIPFS, handleCreateOrganisation } from "../src/organisation";
import { createAdminChangedEvent } from "./organisation-utils";
import { log } from "matchstick-as/assembly/log";

import { processItem } from "../src/Organisation";
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

describe("IPFS checking", () => {
  beforeAll(() => {
    let previousAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let newAdmin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );

    mockIpfsFile("ipfsCatFileHash", "tests/lightcast.json");
    mockIpfsFile("ipfsCatFileHash-trim", "tests/lightcast-simple.json");
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ipfs.map", () => {
    ipfs.mapJSON(
      "ipfsCatFileHash-trim",
      "processItem",
      Value.fromString("Skills")
    );
    assert.entityCount("Skill", 8);
  });

  test("ipfs.map function calling", () => {
    createIPFS("ipfsCatFileHash-trim");
    assert.entityCount("Skill", 8);

    assert.fieldEquals(
      "Skill",
      "KS126XS6CQCFGC3NG79X",
      "name",
      ".NET Assemblies"
    );
  });
});
