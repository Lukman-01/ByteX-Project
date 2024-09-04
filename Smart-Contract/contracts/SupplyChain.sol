// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract SupplyChain {

    address public owner;

    enum Status {
        Ordered,
        InTransit,
        Delivered
    }

    enum HealthCondition {
        New,
        Good,
        Damaged
    }

    struct Product {
        bytes32 id; // Hashed ID of the product
        string name; // Name of the product
        string serialNumber; // Serial number of the product
        Status status; // Current status of the product
        address manufacturer; // Address of the manufacturer
        address transporter; // Address of the transporter
        address consumer; // Address of the consumer
        HealthCondition healthCondition; // Health condition of the product
        string destination; // Destination address of the product
    }

    mapping(bytes32 => Product) private products;
    bytes32[] private productIds; // Array to store all product IDs

    event ProductAdded(bytes32 productId, address indexed manufacturer);
    event ProductStatusUpdated(bytes32 productId, Status status, address indexed updater);
    event HealthConditionUpdated(bytes32 productId, HealthCondition healthCondition, address indexed updater);

    uint256 public creationFee = 0.001 ether; // Fee required to create a product

    // Custom errors
    error NotAuthorized();
    error NotOwner();
    error IncorrectFee();
    error ProductExists();
    error InvalidInput();
    error InvalidStatusTransition();

    constructor() {
        owner = msg.sender;
    }

    function _onlyAuthorized(bytes32 _productId) private view {
        if (msg.sender != products[_productId].manufacturer &&
            msg.sender != products[_productId].transporter &&
            msg.sender != products[_productId].consumer) {
            revert NotAuthorized();
        }
    }

    function _onlyOwner() private view {
        if (msg.sender != owner) {
            revert NotOwner();
        }
    }

    /**
     * @dev Function to add a product to the supply chain. The manufacturer pays a fee.
     * @param _name The name of the product.
     * @param _serialNumber The serial number of the product.
     * @param _transporter The address of the transporter.
     * @param _consumer The address of the consumer.
     * @param _healthCondition The initial health condition of the product.
     * @param _destination The destination address of the product.
     * @return The generated product ID.
     */
    function addProduct(
        string memory _name,
        string memory _serialNumber,
        address _transporter,
        address _consumer,
        HealthCondition _healthCondition,
        string memory _destination
    ) public payable returns (bytes32) {
        if (msg.value != creationFee) {
            revert IncorrectFee();
        }

        // Check necessary inputs before hashing
        if (bytes(_name).length == 0 || bytes(_serialNumber).length == 0 || bytes(_destination).length == 0) {
            revert InvalidInput();
        }

        // Generate a unique product ID by hashing the product details
        bytes32 productId = keccak256(abi.encodePacked(_name, _serialNumber, msg.sender));

        // Ensure the product doesn't already exist
        if (products[productId].manufacturer != address(0)) {
            revert ProductExists();
        }

        // Create a new product and store it
        products[productId] = Product({
            id: productId,
            name: _name,
            serialNumber: _serialNumber,
            status: Status.Ordered,
            manufacturer: msg.sender,
            transporter: _transporter,
            consumer: _consumer,
            healthCondition: _healthCondition,
            destination: _destination
        });

        productIds.push(productId); // Store the product ID in the array

        emit ProductAdded(productId, msg.sender);
        return productId;
    }

    /**
     * @dev Function for the transporter to update the status of a product to "InTransit".
     * @param _productId The ID of the product.
     */
    function updateStatusInTransit(bytes32 _productId) public {
        _onlyAuthorized(_productId);

        if (msg.sender != products[_productId].transporter) {
            revert NotAuthorized();
        }
        if (products[_productId].status != Status.Ordered) {
            revert InvalidStatusTransition();
        }

        products[_productId].status = Status.InTransit;

        emit ProductStatusUpdated(_productId, Status.InTransit, msg.sender);
    }

    /**
     * @dev Function for the consumer to update the status of a product to "Delivered".
     * @param _productId The ID of the product.
     */
    function updateStatusDelivered(bytes32 _productId) public {
        _onlyAuthorized(_productId);

        if (msg.sender != products[_productId].consumer) {
            revert NotAuthorized();
        }
        if (products[_productId].status != Status.InTransit) {
            revert InvalidStatusTransition();
        }

        products[_productId].status = Status.Delivered;

        emit ProductStatusUpdated(_productId, Status.Delivered, msg.sender);
    }

    /**
     * @dev Function to update the health condition of a product.
     * @param _productId The ID of the product.
     * @param _newHealthCondition The new health condition of the product.
     */
    function updateHealthCondition(bytes32 _productId, HealthCondition _newHealthCondition) public {
        _onlyAuthorized(_productId);
        
        products[_productId].healthCondition = _newHealthCondition;
        emit HealthConditionUpdated(_productId, _newHealthCondition, msg.sender);
    }

    /**
     * @dev Function to retrieve the status of a product.
     * @param _productId The ID of the product.
     * @return The current status of the product.
     */
    function getProductStatus(bytes32 _productId) public view returns (Status) {
        _onlyAuthorized(_productId);
        return products[_productId].status;
    }

    /**
     * @dev Function to retrieve the health condition of a product.
     * @param _productId The ID of the product.
     * @return The current health condition of the product.
     */
    function getHealthCondition(bytes32 _productId) public view returns (HealthCondition) {
        _onlyAuthorized(_productId);
        return products[_productId].healthCondition;
    }

    /**
     * @dev Function to retrieve the details of a product.
     * @param _productId The ID of the product.
     * @return The product details.
     */
    function getProduct(bytes32 _productId) public view returns (Product memory) {
        _onlyAuthorized(_productId);
        return products[_productId];
    }

    /**
     * @dev Function to retrieve all products.
     * @return An array of Product structs representing all products.
     */
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }
        return allProducts;
    }

    /**
     * @dev Function to withdraw the funds collected from product creation fees.
     */
    function withdrawFunds() public {
        _onlyOwner();
        payable(owner).transfer(address(this).balance);
    }

    /**
     * @dev Function to update the creation fee.
     * @param _newFee The new creation fee.
     */
    function updateCreationFee(uint256 _newFee) public {
        _onlyOwner();
        creationFee = _newFee;
    }
}
