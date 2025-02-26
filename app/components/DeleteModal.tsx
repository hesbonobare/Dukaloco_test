import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

interface DeleteConfirmationModalProps {
  visible: boolean;
  postTitle: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  postTitle,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete {postTitle}</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete{" "}
            <Text style={styles.highlightText}>{postTitle}</Text>?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  highlightText: {
    fontWeight: "bold",
    color: "#e74c3c",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#bdc3c7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default DeleteConfirmationModal;
