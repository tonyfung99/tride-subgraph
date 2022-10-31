import { beforeAll, mockIpfsFile } from "matchstick-as";

export let mockEventBadgesAddress =
  "0x1000000000000000000000000000000000000001";

export let mockUser = "0x0000000000000000000000000000000000000001";

beforeAll(() => {
  mockIpfsFile(
    "FAKE_ORGANISATION_1",
    "tests/ipfs_file/organisations/organisation_1.json"
  );
  mockIpfsFile(
    "FAKE_ORGANISATION_2",
    "tests/ipfs_file/organisations/organisation_2.json"
  );
  mockIpfsFile(
    "FAKE_EVENT_BADGE_1",
    "tests/ipfs_file/eventBadges/eventBadge_1.json"
  );
});
