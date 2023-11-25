import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTransaction } from "../redux/actions";

import ContentPicker from "../components/ContentPicker";
import Account from "../components/Account";
import InputField from "../components/InputField";

export default function AddIncome() {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [pickedAccount, setPickedAccount] = useState(null);
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setPickerVisible(true);
  };

  const hideDatePicker = () => setPickerVisible(false);

  const handleCategorySelect = (category) => setPickedAccount(category);
  const handleDateConfirm = (selDate) => {
    hideDatePicker();

    setDate(selDate);
    setSelectedDate(
      `${String(selDate.getDate()).padStart(2, "0")}/${String(
        selDate.getMonth() + 1
      ).padStart(2, "0")}/${String(selDate.getFullYear()).slice(2)}`
    );
  };

  const handleSave = () => {
    if (!selectedDate || !pickedAccount || !amount) {
      alert("Please fill all fields");
      return;
    }

    const intAmount = parseInt(amount);

    const newIncomeTransaction = {
      id: uuidv4(),
      type: "Income",
      date: selectedDate,
      account: pickedAccount,
      amount: intAmount,
      note: note || "",
    };

    dispatch(addTransaction(newIncomeTransaction));
    nav.navigate("Default");
  };

  return (
    <View style={styles.base}>
      <View style={{ marginTop: 38 }}>
        <InputField
          label="Date"
          placeholder="Pick Date"
          value={selectedDate}
          onPress={showDatePicker}
          editable={false}
        />
        <InputField
          label="Account"
          placeholder="Choose Account"
          value={pickedAccount?.name}
          onPress={openModal}
          editable={false}
        />
        <InputField
          label="Amount"
          placeholder="Enter Amount"
          keyboardType="numeric"
          maxLength={12}
          onChangeText={setAmount}
        />
        <InputField
          label="Note"
          placeholder="Enter Note"
          maxLength={30}
          onChangeText={setNote}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.5}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        date={date}
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <ContentPicker isvisible={isModalVisible} onClose={closeModal}>
        <Account onSelect={handleCategorySelect} onClose={closeModal} />
      </ContentPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#F7F8F9",
  },
  saveButton: {
    width: "86.4%",
    height: 36,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#2340DC",
    marginTop: 99,
  },
});
