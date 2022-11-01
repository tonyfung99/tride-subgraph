import { BigInt, Bytes, json, TypedMap } from "@graphprotocol/graph-ts";
import {
  AdminChanged,
  BeaconUpgraded,
  createOrgProfileEvent,
  EventCreatedEvent,
  Initialized,
  updateOrgProfileEvent,
  Upgraded,
} from "../generated/Organisation/Organisation";
import { Skill, Organisation, Event } from "../generated/schema";
import { ipfs } from "@graphprotocol/graph-ts";
import { JSONValue, Value } from "@graphprotocol/graph-ts";
import { log } from "@graphprotocol/graph-ts";
import { EventBadge } from "../generated/templates";
import { getJSONFromIPFS } from "./helper/utils";

const SKILL_CID = "bafybeihjt3rgkglzenvytr3m3wyw5db35frysvldobi6t7b5i7ja4qed6u";
// const SKILL_CID = "bafybeiatfzqendwjo6qrwbx7tosavgmaa34gn5s463wcm3rhf7a3bo3ai4";
const SKILL_CID_LOCAL = "QmVLSN1629CqzGe2bccwiyi8dL9uHsuaDHQZCWM5PmhDF4";

const TRIM_CID_LOCAL = "QmS1wPgbK43pZ4CcCtkerDPoZf7CzCuqYwUUsbFE5LaVUj";
const TRIM_CID = "bafkreifv77pmv5ejqjiimejeawts5cj5336yeyak3s64fnenulyufrfwua";
// const TRIM_CID = "bafybeihhsua7k3imaiggpdzrtvc4hobzsnl5p4mpxlxpayidujtigu6gfu";
const SIMPLE_CID =
  "bafkreiddwwzah3ie232jywmglvxa3rdhijp2udmffgx3sngy75wvkrwzme";

const TEST_1 = "bafkreiddwwzah3ie232jywmglvxa3rdhijp2udmffgx3sngy75wvkrwzme";
const TEST_2_ONE_LINE =
  "bafkreihhzcpc3tt5xxb7lt5ewggmuf4xajcwkx62tzpya3n2yjoabubmpy";

const MALFORM_ONE_LINE = "QmUBgQNMGg38YFjRbZHsaJV9TjYkGy2CQdsucby6wZiGZv";
const MALFORM_FULL_SET = "QmePks1sj5JevU5R6NAFHhJR14EFatEYxwLiYUEgnxv1bQ";

export function processItem(value: JSONValue, userData: Value): void {
  // See the JSONValue documentation for details on dealing
  // with JSON values
  log.warning("processItem --", []);
  // return;
  let obj = value.toObject();
  // log.warning("processItem - start:", []);

  if (!obj) {
    return;
  }
  let id = obj.get("id");
  let name = obj.get("name");
  let desc = obj.get("description");

  if (!id || !name) {
    return;
  }

  // Callbacks can also created entities
  let newItem = new Skill(id.toString());
  newItem.name = name.toString();

  if (desc) {
    if (!desc.isNull()) {
      newItem.description = desc.toString();
    }
  }

  let category_id = obj.get("category_id");
  let subcategory_id = obj.get("subcategory_id");
  let type = obj.get("type");

  if (category_id) {
    newItem.category_id = category_id.toBigInt();
  }

  if (subcategory_id) {
    newItem.subcategory_id = subcategory_id.toBigInt();
  }

  if (type) {
    newItem.type = type.toString();
  }

  newItem.save();
}

export function createIPFS(hash: string): void {
  log.warning("createIPFS hash- {}", [hash]);
  ipfs.mapJSON(hash, "processItem", Value.fromString("Skills"));
}

export function handleInitContract(event: Initialized): void {
  log.info("skill Record", []);
  createIPFS(MALFORM_FULL_SET);
}

export function handleCreateOrganisation(event: createOrgProfileEvent): void {
  let org = new Organisation(event.params.OrgId.toString());
  org.name = event.params.orgInfo.name;
  org.description = event.params.orgInfo.description;
  org.metadataURI = event.params.orgInfo.metadataURI;
  org.websiteURL = "/";
  org.twitterId = "/";
  org.discordServer = "/";
  org.contactEmail = "/";
  org.industry = "/";

  const ipfs_data = getJSONFromIPFS(event.params.orgInfo.metadataURI);
  if (ipfs_data) {
    let imageURL = ipfs_data.get("imageURL");
    if (imageURL) {
      org.image = imageURL.toString();
    }

    let websiteURL = ipfs_data.get("websiteURL");
    if (websiteURL) {
      org.websiteURL = websiteURL.toString();
    }

    let twitterId = ipfs_data.get("twitterId");
    if (twitterId) {
      org.twitterId = twitterId.toString();
    }

    let discordServer = ipfs_data.get("discordServer");
    if (discordServer) {
      org.discordServer = discordServer.toString();
    }

    let contactEmail = ipfs_data.get("contactEmail");
    if (contactEmail) {
      org.contactEmail = contactEmail.toString();
    }

    let industry = ipfs_data.get("industry");
    if (industry) {
      org.industry = industry.toString();
    }
  }
  org.save();
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleUpgraded(event: Upgraded): void {}

export function handleUpdateOrganisation(event: updateOrgProfileEvent): void {
  const orgId = event.params.OrgId.toString();
  let org = Organisation.load(orgId);
  if (org != null) {
    org.name = event.params.orgInfo.name;
    org.description = event.params.orgInfo.description;
    org.metadataURI = event.params.orgInfo.metadataURI;

    const ipfs_data = getJSONFromIPFS(event.params.orgInfo.metadataURI);
    if (ipfs_data) {
      let imageURL = ipfs_data.get("imageURL");
      if (imageURL) {
        org.image = imageURL.toString();
      }

      let websiteURL = ipfs_data.get("websiteURL");
      if (websiteURL) {
        org.websiteURL = websiteURL.toString();
      }

      let twitterId = ipfs_data.get("twitterId");
      if (twitterId) {
        org.twitterId = twitterId.toString();
      }

      let discordServer = ipfs_data.get("discordServer");
      if (discordServer) {
        org.discordServer = discordServer.toString();
      }

      let contactEmail = ipfs_data.get("contactEmail");
      if (contactEmail) {
        org.contactEmail = contactEmail.toString();
      }

      let industry = ipfs_data.get("industry");
      if (industry) {
        org.industry = industry.toString();
      }
    }

    org.save();
  }
}

export function handleEventCreatedEvent(event: EventCreatedEvent): void {
  const relatedOrgisation = Organisation.load(event.params.OrgId.toString());
  if (relatedOrgisation != null) {
    let eventObj = new Event(event.params.eventContractAddress.toHex());

    eventObj.code = event.params.code;
    eventObj.name = event.params.name;
    eventObj.start_date = event.params.start_date;
    eventObj.end_date = event.params.end_date;

    eventObj.organisation = relatedOrgisation.id;
    eventObj.save();

    EventBadge.create(event.params.eventContractAddress);
    log.info("[SELF-INFO]Start monitor event contract {}", [
      event.params.eventContractAddress.toHex(),
    ]);
  }
}
