import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { CollectableKinds } from '../core';
import { PersistenceService } from '../persistence.service';

@Component({
  selector: 'app-material-collects',
  templateUrl: './material-collects.component.html',
  styleUrls: ['./material-collects.component.scss']
})
export class MaterialCollectsComponent implements OnInit {

  constructor(private collectionService: CollectionService, private persistenceService: PersistenceService) { }

  ngOnInit(): void {
  }

  get(kind: CollectableKinds) {
    return this.collectionService.collects[kind];
  }
}
