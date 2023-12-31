.PHONY: install
install:
	npm install

.PHONY: compile
compile:
	npx hardhat compile

.PHONY: test
test: compile
	npx hardhat test

.PHONY: deploy
deploy:
	npx hardhat run scripts/deploy.ts --network $(NETWORK)

.PHONY: verify
verify:
	npx hardhat verify --network $(NETWORK) --contract contracts/Splitter.sol:Splitter $(FEE_ADDRESS) $(FEE_PERCENTAGE) 