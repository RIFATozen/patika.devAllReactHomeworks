import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { postOrder } from "../../api";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { useRef, useState } from "react";

function Basket() {
  const [address, setAddress] = useState("");
  const { items, removeFromBasket, setItems } = useBasket();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
    await postOrder(input);
    setItems([]);
    onClose();
  };
  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">You have not any item in your basket.</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="18">
                    {item.title}-{item.price} TL
                  </Text>
                  <Image
                    htmlWidth={200}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt="10">
            <Text fontSize="22">Total:{total}</Text>
          </Box>
          <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
