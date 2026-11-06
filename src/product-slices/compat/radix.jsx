import { useContext } from "react";
import PropTypes from "prop-types";
import * as Radix from "radix-ui";
import { DemoBrowserNavigation, PortalContainer } from "../portalContext";

function scoped(primitive) {
  function Portal({ children, ...props }) {
    const container = useContext(PortalContainer);
    return <primitive.Portal {...props} container={container}>{children}</primitive.Portal>;
  }
  Portal.propTypes = { children: PropTypes.node };
  return { ...primitive, Portal };
}
function DialogRoot({ modal, ...props }) {
  const browser = useContext(DemoBrowserNavigation);
  return <Radix.Dialog.Root {...props} modal={browser ? false : modal} />;
}
DialogRoot.propTypes = { modal: PropTypes.bool };
export const Dialog = { ...scoped(Radix.Dialog), Root: DialogRoot };
export const Popover = scoped(Radix.Popover);
export const DropdownMenu = scoped(Radix.DropdownMenu);
export const Slot = Radix.Slot;
