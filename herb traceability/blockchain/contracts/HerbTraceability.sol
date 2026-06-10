// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HerbTraceability {
    struct HarvestEvent {
        string batchId;
        string collector;
        string location;
        string species;
        string latitude;
        string longitude;
        uint256 timestamp;
    }

    struct ProcessingEvent {
        string batchId;
        string step;
        string details;
        uint256 timestamp;
    }

    mapping(string => HarvestEvent) public harvestEvents;
    mapping(string => ProcessingEvent[]) public processingEvents;

    event HarvestAdded(string batchId, string collector, string location, string species, string latitude, string longitude, uint256 timestamp);
    event ProcessingAdded(string batchId, string step, string details, uint256 timestamp);

    function addHarvestEvent(
        string memory batchId,
        string memory collector,
        string memory location,
        string memory species,
        string memory latitude,
        string memory longitude
    ) public {
        HarvestEvent memory eventData = HarvestEvent(batchId, collector, location, species, latitude, longitude, block.timestamp);
        harvestEvents[batchId] = eventData;
        emit HarvestAdded(batchId, collector, location, species, latitude, longitude, block.timestamp);
    }

    function addProcessingEvent(
        string memory batchId,
        string memory step,
        string memory details
    ) public {
        ProcessingEvent memory procData = ProcessingEvent(batchId, step, details, block.timestamp);
        processingEvents[batchId].push(procData);
        emit ProcessingAdded(batchId, step, details, block.timestamp);
    }

    function getProcessingEvents(string memory batchId) public view returns (ProcessingEvent[] memory) {
        return processingEvents[batchId];
    }

    function getHarvestEvent(string memory batchId) public view returns (HarvestEvent memory) {
        return harvestEvents[batchId];
    }
}
