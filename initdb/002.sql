CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idTransactionStatus` int(11) NOT NULL DEFAULT '1',
  `buyDate` date NOT NULL,
  `idAccount` int(11) NOT NULL,
  `idTicket` bigint(20) NOT NULL,
  `idShow` int(11) NOT NULL,
  `value` float NOT NULL,
  `failDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_COMPRA_STATUS_COMPRA_idx` (`idTransactionStatus`),
  CONSTRAINT `fk_purchases_purchase_status` FOREIGN KEY (`idTransactionStatus`) REFERENCES `transactionStatus` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
